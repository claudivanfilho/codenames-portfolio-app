alter table "public"."rooms" drop column "guesser";

alter table "public"."rooms" drop column "helper";

alter table "public"."rooms" add column "guesser_id" uuid;

alter table "public"."rooms" add column "guesser_name" text;

alter table "public"."rooms" add column "helper_id" uuid not null;

alter table "public"."rooms" add column "helper_name" text not null;

alter table "public"."rooms" add constraint "rooms_guesser_id_fkey" FOREIGN KEY (guesser_id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."rooms" validate constraint "rooms_guesser_id_fkey";

alter table "public"."rooms" add constraint "rooms_helper_id_fkey" FOREIGN KEY (helper_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."rooms" validate constraint "rooms_helper_id_fkey";


