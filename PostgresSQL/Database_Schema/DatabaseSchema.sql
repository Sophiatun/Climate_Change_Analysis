-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/Ge3nsB
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "GLOBAL_TEMPERATURES" (
    "Date" INT   NOT NULL,
    "Land_Avg_Temperature" FLOAT   NOT NULL,
    "Land_Max_Temperature" FLOAT   NOT NULL,
    "Land_Min_Temperature" FLOAT   NOT NULL,
    "Land_And_Ocean_Average_Temperature" FLOAT   NOT NULL,
    CONSTRAINT "pk_GLOBAL_TEMPERATURES" PRIMARY KEY (
        "Date"
     )
);

CREATE TABLE "CITIES" (
    "City" VARCHAR   NOT NULL,
    "Country" VARCHAR   NOT NULL,
    "Year" INT   NOT NULL,
    "Yearly_Average_Temperature" FLOAT   NOT NULL
);

CREATE TABLE "COUNTRIES" (
    "Country" VARCHAR   NOT NULL,
    "Year" INT   NOT NULL,
    "Yearly_Average_Temperature" FLOAT   NOT NULL
);

CREATE TABLE "STATES" (
    "State" VARCHAR   NOT NULL,
    "Country" VARCHAR   NOT NULL,
    "Year" INT   NOT NULL,
    "Yearly_Average_Temperature" DOUBLE PRECISION   NOT NULL
);

CREATE TABLE "AIR_POLLUTION" (
    "COUNTRY" VARCHAR   NOT NULL,
    "Year" INT   NOT NULL,
    "NITROGEN_OXIDE" FLOAT   NOT NULL,
    "SUPLHUR_DIOXIDE" FLOAT   NOT NULL,
    "CARBON_MONOXIDE" FLOAT   NOT NULL,
    "ORGANIC_CARBON" FLOAT   NOT NULL,
    "NMVOCs" FLOAT   NOT NULL,
    "BLACK_CARBON" FLOAT   NOT NULL,
    "AMMONIA" FLOAT   NOT NULL
);

CREATE TABLE "POPULATION" (
    "COUNTRY" VARCHAR   NOT NULL,
    "Year" INT   NOT NULL,
    "POPULATION" INT   NOT NULL
);

ALTER TABLE "GLOBAL_TEMPERATURES" ADD CONSTRAINT "fk_GLOBAL_TEMPERATURES_Date" FOREIGN KEY("Date")
REFERENCES "CITIES" ("Year");

ALTER TABLE "CITIES" ADD CONSTRAINT "fk_CITIES_Country_Year_Yearly_Average_Temperature" FOREIGN KEY("Country", "Year", "Yearly_Average_Temperature")
REFERENCES "COUNTRIES" ("Country", "Year", "Yearly_Average_Temperature");

ALTER TABLE "AIR_POLLUTION" ADD CONSTRAINT "fk_AIR_POLLUTION_Year" FOREIGN KEY("Year")
REFERENCES "POPULATION" ("Year");

