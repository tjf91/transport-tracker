drop table if exists companies,company_driver,drivers, trips, receipts;
create table companies
(id serial primary key,name varchar(100) unique,phone_number varchar(100), email varchar(100), hash text);

create table drivers
(d_id serial primary key,name varchar(100) unique,phone_number varchar(100), email varchar(100), hash text);

create table company_driver
(id serial primary key, company_id int references companies(id), driver_d_id int references drivers(d_id));

create table trips
(id serial primary key, name varchar(100), total_spent int, status varchar(20), date_start date, date_end date, driver_d_id int references drivers(d_id), company_id int references companies(id));

create table receipts
(id serial primary key, date_created date, lat int, lng int, type varchar(100),city varchar(100),state varchar(30) amount int, total int, trip_id int references trips(id));


insert into companies
(name,phone_number, email, hash)
values
('JimboTransport','480000','jim@gmail','passwrd');


insert into drivers
(name,phone_number, email, hash)
values
('Jimbo','480000','jim@gmail','password');

insert into company_driver
(company_id,driver_d_id)
values
(1,1);

insert into trips
(name, date_start, date_end, driver_d_id, company_id)
values
('Trip 1','2008-11-11','2008-12-17',1,1);

insert into receipts
(city,state,date_created,lat,lng,type,amount,total,trip_id)
values
('phx','az','2008-11-12',33,-110,'gas',80,400,1),
('phx','az','2008-11-16',34,-111,'gas',90,500,1)
;
