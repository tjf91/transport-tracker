insert into companies
(name,phone_number,email,hash)
values
($1,$2,$3,$4)
returning *;