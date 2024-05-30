CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`price` integer NOT NULL,
	`category` text NOT NULL,
	`subCategory` text,
	`images` text NOT NULL
);
