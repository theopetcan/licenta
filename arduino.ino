const int led_pin = 13;
void setup() {                
// Turn the Serial Protocol ON
  Serial.begin(9600);
  pinMode(led_pin, OUTPUT);
}
void loop() {
  if (Serial.available()) {
    String str = Serial.readString();

    if (str == "on") {
      Serial.println("Turning on");
      digitalWrite(led_pin, HIGH);

    } else if (str == "off") {
      Serial.println("Turning off");
      digitalWrite(led_pin, LOW);

    } else {
      Serial.println("Unknown");
    }
  }
}