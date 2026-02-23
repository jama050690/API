create table users (
	id serial not null primary key,
	email varchar(254) not null unique,
	password varchar(64) not null,
	name varchar(40) not null,
	create_at timestamp default current_timestamp
);
