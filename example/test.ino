#include <ArduinoJson.h>
#include <Servo.h>  // librería para poder controlar el servo

Servo servoMotor;   // Crea un objeto servo llamado servoMotor
void setup(){ 
  Serial.begin(9600);
  // Asociamos el servo a la patilla 2 del Arduino
  servoMotor.attach(9);
}
 
void loop(){

  DynamicJsonDocument doc(1024);
  JsonObject root = doc.to<JsonObject>();


  servoMotor.write(0);
  delay(5000);

  JsonArray data = doc.createNestedArray("coords");
  doc.add()
  doc.add();
  
  
  serializeJson(doc, Serial);
   Serial.println();
   //serializeJsonPretty(doc, Serial);
  //Serial.println();

  
//  // Desplazamos a la posición 0º
//  Serial.println("posición:  0");
//  servoMotor.write(0);
//  delay(5000);  // Esperamos 1 segundo
//  
//  // Desplazamos a la posición 90º
//  Serial.println("posición:  90");
//  servoMotor.write(90);
//  delay(5000);  // Esperamos 1 segundo
//  
//  // Desplazamos a la posición 180º
//  Serial.println("posición:  180");
//  servoMotor.write(180);
//  delay(5000);  // Esperamos 1 segundo
}
