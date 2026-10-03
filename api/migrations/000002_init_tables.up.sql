-------------------------------------------------------------------  AI_CONVERSATION
CREATE TABLE if not exists margi.conversation (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	user_id int4 NOT NULL,
	title varchar NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	pinned_at timestamptz DEFAULT '1970-01-01 03:00:00+03'::timestamp with time zone NOT NULL,
	CONSTRAINT conversation_pk PRIMARY KEY (id)
);

----------------------------------------------------------- AI MESSAGE

CREATE TABLE if not exists margi.message (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	conversation_id int4 NOT NULL,
	message_role_id int4 NOT NULL,
	"content" varchar NOT NULL,
	model varchar NULL,
	prompt_tokens int4 NULL,
	completion_tokens int4 NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT message_pk PRIMARY KEY (id)
);

------------------------------------------------------------- AI MESSAGE ROLE
CREATE TABLE if not exists margi.message_role (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	"role" varchar NOT NULL,
	CONSTRAINT message_role_pk PRIMARY KEY (id)
);

