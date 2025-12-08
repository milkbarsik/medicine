-- DROP TABLE IF EXISTS prescriptions       CASCADE;
-- DROP TABLE IF EXISTS reception_disease   CASCADE;
-- DROP TABLE IF EXISTS receptions          CASCADE;
-- DROP TABLE IF EXISTS medicines           CASCADE;
-- DROP TABLE IF EXISTS disease             CASCADE;
-- DROP TABLE IF EXISTS doctors             CASCADE;
-- DROP TABLE IF EXISTS patients            CASCADE;

CREAT TABLE doctors (
  id          BIGSERIAL PRIMARY KEY,
  "login"     TEXT UNIQUE NOT NULL,
  "password"  TEXT        NOT NULL,
  first_name  TEXT        NOT NULL,
  middle_name TEXT,
  last_name   TEXT        NOT NULL
);

CREATE TABLE tokens (
  id SERIAL PRIMARY KEYYY,
  doctor_id INT NOT NULL,
  refresh_token TEXT UNIQUE NOT NULL,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

CREATE TABLE patients (
  id          BIGSERIAL PRIMARY KEY,
  first_name  TEXT        NOT NULL,
  middle_name TEXT,
  last_name   TEXT        NOT NULL,
  gender      TEXT        NOT NULL CHECK (gender IN ('male','female','other')),
  birthday    DATE        NOT NULL,
  address     TEXT        NOT NULL
);

CREATE TABLE disease (
  id     BIGSERIAL PRIMARY KEY,
  title  TEXT NOT NULL UNIQUE
);

CREATE TABLE medicines (
  id                BIGSERIAL PRIMARY KEY,
  title             TEXT NOT NULL UNIQUE,
  indications_of_use TEXT,
  side_effects       TEXT,
  method_of_use      TEXT
);

CREATE TABLE receptions (
  id           BIGSERIAL PRIMARY KEY,
  doctor_id    BIGINT NOT NULL REFERENCES doctors(id)  ON UPDATE CASCADE,
  patient_id   BIGINT NOT NULL REFERENCES patients(id) ON UPDATE CASCADE,
  patient_name TEXT NOT NULL,
  "date"       TIMESTAMPTZ NOT NULL,
  place        TEXT        NOT NULL,
  symptoms     TEXT,
  description  TEXT
);

CREATE TABLE reception_disease (
  reception_id BIGINT NOT NULL REFERENCES receptions(id)
                 ON UPDATE CASCADE ON DELETE CASCADE,
  disease_id   BIGINT NOT NULL REFERENCES disease(id)
                 ON UPDATE CASCADE,
  PRIMARY KEY (reception_id, disease_id)
);

CREATE TABLE prescriptions (
  reception_id BIGINT NOT NULL REFERENCES receptions(id)
                 ON UPDATE CASCADE ON DELETE CASCADE,
  medicine_id  BIGINT NOT NULL REFERENCES medicines(id)
                 ON UPDATE CASCADE,
  description  TEXT,
  PRIMARY KEY (reception_id, medicine_id)
);


CREATE INDEX idx_receptions_date     ON receptions("date");

CREATE INDEX idx_reception_disease_d ON reception_disease(disease_id);

CREATE INDEX idx_prescriptions_m     ON prescriptions(medicine_id);

CREATE INDEX idx_receptions_doctor   ON receptions(doctor_id);
CREATE INDEX idx_receptions_patient  ON receptions(patient_id);