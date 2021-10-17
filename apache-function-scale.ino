
//hdocs
/*#include <AsyncEventSource.h>
#include <AsyncJson.h>
#include <SPIFFSEditor.h>
#include <WebHandlerImpl.h>*/
//#include <ESPAsyncWebServer.h>
/*#include <WebAuthentication.h>
#include <AsyncWebSynchronization.h>
#include <AsyncWebSocket.h>
#include <WebResponseImpl.h>
#include <StringArray.h>*/

#include <Arduino_JSON.h>
#include <HX711.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <WiFiClient.h>
#include <ESP8266mDNS.h>

#include <FS.h>
#define LED_PIN 16

IPAddress ip();
IPAddress gateway();
IPAddress subnet();

//-------------------------------------------------------------------------
//  WiFi Data
//-------------------------------------------------------------------------
#define WLAN_SSID      
#define WLAN_PASS       
//-------------------------------------------------------------------------

//ESPAsyncWebServer server(80);
ESP8266WebServer server(80);

int sensorValue = 1;
HX711 scale;
String weight = "";      


void LedOn(){
  server.send(200, "text/html", "<h1>LED is ON</h1>"); //h1にjsから挿入できるかテストしてみる
  digitalWrite(LED_PIN,HIGH);
}

void LedOff(){
  server.send(200, "text/html", "<h1>LED is Off</h1>");
  digitalWrite(LED_PIN,LOW);
}

  
void setup() {
  pinMode(LED_PIN,OUTPUT);
  ESP.wdtDisable();
  Serial.begin(4800);

  WiFi.config(ip, gateway, subnet);
  WiFi.begin(WLAN_SSID, WLAN_PASS);
 
  Serial.println("");
  while(WiFi.status() != WL_CONNECTED){
    delay(1000);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  ESP.wdtFeed();
    
  Serial.println("start");
  scale.begin(14, 13); //DT:14, SCK:13
  
  Serial.print("read:");
  Serial.println(scale.read());

  scale.set_scale();
  scale.tare();

  ESP.wdtFeed();
  
  Serial.print("calibrating...");
  delay(5000);
  Serial.println(scale.get_units(10));

  scale.set_scale(530.5-5);//何ものせずに起動　calibrating... が表示されたらすかさず1円玉を1枚載せる (1g) 値を読む　scale.set_scale(...); に値を埋めこむ -1542.00
  scale.tare();

  Serial.print("read (calibrated):");
  Serial.println(scale.get_units(10));
  
//ajaxからアクセスするため
  server.on("/myfunc", [](){    
    String message = "";
    message += "URI: ";
    message += server.uri();
    message += "\nMethod: ";
    message += (server.method() == HTTP_GET)?"GET":"POST";
    message += "\nArguments: ";
    message += server.args();
    message += "\n";
    for (uint8_t i=0; i<server.args(); i++){
      message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
    }
      String num = server.arg(0);

    server.send(200, "text/plain", message);
 });
  server.on("/myfunc", HTTP_OPTIONS, []() {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(204);
 });

/*********************************************/
  
  server.on("/weight", [](){ server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/html", weight); 
  });//WebサーバからWebブラウザ（クライアント）に送るHTMLデータの関数です。ここではWebブラウザに送るHTMLデータを作成し、Webブラウザに送信します。
  server.on("/tare", [](){ scale.tare(); server.send(200, "text/html", "tare()"); });//お皿などの重さを引く。
  server.on("/on", LedOn);
  server.on("/off", LedOff);
  
  server.begin();
}


void loop() {
  ESP.wdtFeed();
  server.handleClient();
  weight = String(scale.get_units(10), 1);
  
  Serial.println(weight);
  delay(50);
}
