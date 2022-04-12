drop table if exists Ukraine_Conflict;

create table Ukraine_Conflict(
	index bigint,
	EVENT_ID_CNTY varchar Primary Key,
	EVENT_ID_NO_CNTY varchar,
	EVENT_DATE date,
	EVENT_TYPE varchar,
	SUB_EVENT_TYPE varchar,
	ACTOR1 varchar,
	LOCATION varchar,
	LATITUDE float(6),
	LONGITUDE float(6),
	SOURCE varchar,
	NOTES varchar,
	FATALITIES int
);

select * from Ukraine_Conflict