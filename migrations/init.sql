CREATE TABLE Ciudadano
(
    ci               int PRIMARY KEY,
    cc               VARCHAR(9),
    fecha_nacimiento DATE,
    nombres          VARCHAR(100),
    apellidos        VARCHAR(100),
    ha_votado        BOOLEAN,
    es_admin         BOOLEAN default FALSE,
    contrasena       VARCHAR(100)
);

INSERT INTO Ciudadano (ci, cc, fecha_nacimiento, nombres, apellidos, ha_votado, es_admin, contrasena)
VALUES (12345678, 'ABC123456', '2000-01-01', 'admin', 'admin', FALSE, TRUE,
        '$2b$10$1pZIW0cKjx/6vTa0103mBeLYCa0sbJ8ZGFDkwNoAn3PGtdn8YwieO');

CREATE TABLE Departamento
(
    nombre VARCHAR(19) PRIMARY KEY
);

CREATE TABLE Zona
(
    id                  int PRIMARY KEY,
    nombre              VARCHAR(50),
    nombre_departamento VARCHAR(19),
    FOREIGN KEY (nombre_departamento) REFERENCES Departamento (nombre)
);

CREATE TABLE Candidato
(
    ci_ciudadano int,
    FOREIGN KEY (ci_ciudadano) REFERENCES Ciudadano (ci)
);

CREATE TABLE Comisaria
(
    numero              int PRIMARY KEY,
    direccion           VARCHAR(100),
    nombre_departamento VARCHAR(19),
    FOREIGN KEY (nombre_departamento) REFERENCES Departamento (nombre)
);

CREATE TABLE AgentePolicia
(
    CI            int,
    num_comisaria int,
    FOREIGN KEY (CI) REFERENCES Ciudadano (CI),
    FOREIGN KEY (num_comisaria) REFERENCES Comisaria (numero)
);

CREATE TABLE Circuito
(
    id            int PRIMARY KEY,
    localidad     VARCHAR(50),
    direccion     VARCHAR(100),
    es_accesible  BOOLEAN,
    serie_cc      VARCHAR(3),
    inicio_num_cc int,
    fin_num_cc    int,
    id_zona       int,
    FOREIGN KEY (id_zona) REFERENCES Zona (id)
);

CREATE TABLE Mesa
(
    id          int PRIMARY KEY AUTO_INCREMENT,
    id_circuito int,
    abierto BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_circuito) REFERENCES Circuito (id)
);

CREATE TABLE Establecimiento
(
    id        int PRIMARY KEY AUTO_INCREMENT,
    nombre    VARCHAR(100),
    tipo      ENUM ('liceo', 'escuela', 'universidad', 'jardin', 'club_social', 'salon', 'oficinas', 'otro'),
    direccion VARCHAR(100),
    id_zona   int,
    FOREIGN KEY (id_zona) REFERENCES Zona (id)
);

CREATE TABLE MiembroMesa
(
    ci_ciudadano  int,
    rol           ENUM ('presidente', 'secretario', 'vocal'),
    organismo     VARCHAR(100),
    mesa_asignada int,
    FOREIGN KEY (ci_ciudadano) REFERENCES Ciudadano (ci),
    FOREIGN KEY (mesa_asignada) REFERENCES Mesa (id)
);

CREATE TABLE Partido
(
    id             int PRIMARY KEY,
    nombre         VARCHAR(50),
    dir_sede       VARCHAR(100),
    presidente     int,
    vicepresidente int,
    FOREIGN KEY (presidente) REFERENCES Candidato (ci_ciudadano),
    FOREIGN KEY (vicepresidente) REFERENCES Candidato (ci_ciudadano)
);

CREATE TABLE Organo
(
    id    int PRIMARY KEY,
    tipo  ENUM ('diputados', 'senadores', 'ediles', 'municipios'),
    nivel ENUM ('departamental', 'nacional')
);

CREATE TABLE Eleccion
(
    id    int PRIMARY KEY AUTO_INCREMENT,
    fecha DATE,
    tipo  ENUM ('interna', 'nacional', 'balotaje', 'departamental', 'municipal', 'plebiscito', 'referendum')
);

CREATE TABLE Papeleta
(
    id          int PRIMARY KEY AUTO_INCREMENT,
    color       VARCHAR(12),
    id_eleccion int,
    tipo        ENUM ('lista', 'plebiscito', 'formula'),
    FOREIGN KEY (id_eleccion) REFERENCES Eleccion (id)
);

CREATE TABLE Lista
(
    id_papeleta         int,
    numero              int UNIQUE,
    ci_candidato        int,
    id_partido          int,
    id_organo           int,
    nombre_departamento VARCHAR(19),
    FOREIGN KEY (id_papeleta) REFERENCES Papeleta (id),
    FOREIGN KEY (ci_candidato) REFERENCES Candidato (ci_ciudadano),
    FOREIGN KEY (id_partido) REFERENCES Partido (id),
    FOREIGN KEY (id_organo) REFERENCES Organo (id),
    FOREIGN KEY (nombre_departamento) REFERENCES Departamento (nombre)
);

CREATE TABLE Plebiscito
(
    id_plebiscito int,
    valor         ENUM ('SI', 'NO'),
    descripcion   VARCHAR(100),
    FOREIGN KEY (id_plebiscito) REFERENCES Papeleta (id)
);

CREATE TABLE Formula
(
    id             int,
    presidente     int,
    vicepresidente int,
    lema           VARCHAR(100),
    FOREIGN KEY (id) REFERENCES Papeleta (id),
    FOREIGN KEY (presidente) REFERENCES Candidato (ci_ciudadano),
    FOREIGN KEY (vicepresidente) REFERENCES Candidato (ci_ciudadano)
);

CREATE TABLE Voto
(
    id           int PRIMARY KEY AUTO_INCREMENT,
    fecha_hora   DATETIME,
    es_observado BOOLEAN,
    estado       ENUM ('valido', 'blanco', 'anulado'),
    id_papeleta  int,
    id_circuito  int,
    FOREIGN KEY (id_papeleta) REFERENCES Papeleta (id),
    FOREIGN KEY (id_circuito) REFERENCES Circuito (id)
);