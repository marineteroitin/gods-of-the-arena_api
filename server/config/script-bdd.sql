
CREATE TABLE "gladiatorType" (
    "id_gladiatorType" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name_gladiatorType" character varying(50) NOT NULL
);

CREATE TABLE "gladiator" (
  "id_gladiator" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name_gladiator" character varying(50) NOT NULL,
  "customization" boolean DEFAULT false NOT NULL,
  "id_gladiatorType" integer NOT NULL,
    CONSTRAINT "fk_type_gladiator" FOREIGN KEY ("id_gladiatorType") REFERENCES "gladiatorType"("id_gladiatorType")
);

CREATE TABLE "weapon" (
    "id_weapon" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name_weapon" character varying(50) NOT NULL,
    "id_gladiatorType" integer NOT NULL,
    CONSTRAINT "fk_type_weapon" FOREIGN KEY ("id_gladiatorType") REFERENCES "gladiatorType"("id_gladiatorType")
); 


CREATE TABLE "proposition" (
     "id_proposition" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     "animal" boolean DEFAULT false NOT NULL,
    "gladiatorType1" integer NOT NULL,
    CONSTRAINT "fk_type1_proposition" FOREIGN KEY ("gladiatorType1") REFERENCES "gladiatorType"("id_gladiatorType"),
    "gladiatorType2" integer NOT NULL,
    CONSTRAINT "fk_type2_proposition" FOREIGN KEY ("gladiatorType2") REFERENCES "gladiatorType"("id_gladiatorType")
);

CREATE TABLE "fight" (
    "id_fight" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date_fight" timestamp without time zone
);

CREATE TABLE "participant" (
    "id_gladiator" integer NOT NULL,
    CONSTRAINT "fk_gladiator_participant" FOREIGN KEY ("id_gladiator") REFERENCES "gladiator"("id_gladiator"),
    "id_fight" integer NOT NULL,
    CONSTRAINT "fk_fight_participant" FOREIGN KEY ("id_fight") REFERENCES "fight"("id_fight"),
    "id_weapon" integer,
    CONSTRAINT "fk_weapon_participant" FOREIGN KEY ("id_weapon") REFERENCES "weapon"("id_weapon"),

    PRIMARY KEY("id_gladiator", "id_fight")
);



INSERT INTO "gladiatorType" ("name_gladiatorType")
    VALUES ('Épéiste'),
            ('Lancier'),
            ('Cavalier'),
            ('Archer'),
            ('Animal');


INSERT INTO "gladiator" ("name_gladiator", "customization", "id_gladiatorType")
    VALUES ('Maximus', 'true', '1'),
            ('Spartacus', 'true','1'),
            ('Priscus', 'false', '1'),
            ('Pollux', 'false', '1'),
            ('Ganicus', 'false', '2'),
            ('Crixus', 'false', '2'),
            ('Jeanclaudedus', 'true', '3'),
            ('Spiculus', 'false', '3'),
            ('Commodus', 'false', '4'),
            ('Flamma', 'false', '4'),
            ('Mouton Noir', 'false', '5'),
            ('Tigre', 'false', '5'),
            ('Lion', 'false', '5');

INSERT INTO "weapon" ("name_weapon", "id_gladiatorType")
    VALUES ('épée à une main', '1'),
            ('épée à deux mains', '1'),
            ('lance', '3'),
            ('épée', '3');
