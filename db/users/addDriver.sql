insert into drivers
(name,phone_number,email,hash)
values
($1,$2,$3,$4)
returning d_id;
