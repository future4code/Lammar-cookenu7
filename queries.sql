CREATE TABLE User_Cookenu (
	id VARCHAR(255) PRIMARY KEY, 
    name VARCHAR(255) NULL, 
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Recipes_Cookenu (
	id VARCHAR(255) PRIMARY KEY, 
    title VARCHAR(255) NOT NULL, 
    description TEXT NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Follow_Cookenu (
	id VARCHAR(255) PRIMARY KEY, 
    id_following VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_following) REFERENCES User_Cookenu(id),
    id_followed VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_followed) REFERENCES User_Cookenu(id)
);