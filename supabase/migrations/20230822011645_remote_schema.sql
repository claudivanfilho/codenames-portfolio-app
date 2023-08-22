alter table "public"."matches" alter column "correct_words" set not null;

alter table "public"."rooms" alter column "correct_guesses" set not null;

alter table "public"."rooms" alter column "wrong_guesses" set not null;


