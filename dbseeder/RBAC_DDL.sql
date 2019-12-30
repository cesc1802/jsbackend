CREATE TABLE IF NOT EXISTS roles (
id int PRIMARY KEY AUTO_INCREMENT,
role_name varchar(50) unique NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
id int PRIMARY KEY AUTO_INCREMENT,
username varchar(45) NOT NULL,
password varchar(255) NOT NULL,
role_id int NOT NULL,
FOREIGN KEY(role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS permissions (
id int PRIMARY KEY AUTO_INCREMENT,
resource varchar(100) NOT NULL,
action varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS grants (
id int PRIMARY KEY AUTO_INCREMENT,
role_id int NOT NULL,
sub_role_id int NOT NULL,
permission_id int NOT NULL,
FOREIGN KEY(role_id) REFERENCES roles(id),
FOREIGN KEY(permission_id) REFERENCES permissions(id),
FOREIGN KEY(sub_role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS resources (
id int PRIMARY KEY AUTO_INCREMENT,
resource_name varchar(100) NOT NULL
)

insert into resources(resource_name) values ('users') 
insert into resources(resource_name) values ('roles') 
insert into resources(resource_name) values ('grants') 
insert into resources(resource_name) values ('permissions') 
insert into resources(resource_name) values ('resources') 

alter table permissions add resource_id int;
alter table permissions modify resource_id int not null;
alter table permissions add created_at TIMESTAMP NOT NULL default current_timestamp;
alter table permissions add foreign key (resource_id) references resources(id);
alter table permissions add constraint UK_PERMISSION unique (resource, action);
alter table resources add constraint UK_RESOURECE unique (resource_name);


select count(*) from permissions as p inner join grants as g on g.permission_id = p.id where p.resource = 'roles' and p.action = 'read';

select count(*) from permissions as p inner join grants as g on g.permission_id = p.id 
inner join roles as r on r.id = g.role_id or r.id = g.sub_role_id
where p.resource = 'roles' and p.action = 'read' and r.role_name = 'admin';