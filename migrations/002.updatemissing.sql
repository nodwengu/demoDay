


create table missing (
	id INTEGER PRIMARY KEY,
	user_name text not null,
	email text not null,
    address text not null,
    ethnicity text not null,
    lastseen DATE not null,
    description VARCHAR not null,
    age INTEGER not null
    -- image VARCHAR not null DEFAULT
    
);