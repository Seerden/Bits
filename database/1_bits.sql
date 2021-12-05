--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: habithistories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.habithistories (
    completion_id integer NOT NULL,
    habit_id uuid NOT NULL,
    habit_entry_date timestamp with time zone NOT NULL,
    entry_index integer NOT NULL,
    completed boolean,
    range_value integer
);


ALTER TABLE public.habithistories OWNER TO postgres;

--
-- Name: habithistories_completion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.habithistories_completion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.habithistories_completion_id_seq OWNER TO postgres;

--
-- Name: habithistories_completion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.habithistories_completion_id_seq OWNED BY public.habithistories.completion_id;


--
-- Name: habits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.habits (
    habit_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    habit_name character varying(32) NOT NULL,
    description character varying(256),
    completion_type text NOT NULL,
    completion_timescale text NOT NULL,
    completion_frequency integer NOT NULL,
    completion_interval integer,
    start_date timestamp with time zone,
    end_date date,
    created date DEFAULT now(),
    unit character varying(32),
    CONSTRAINT habits_completion_frequency_check CHECK ((completion_frequency > 0)),
    CONSTRAINT habits_completion_timescale_check CHECK ((completion_timescale = ANY (ARRAY['day'::text, 'week'::text, 'month'::text, 'year'::text]))),
    CONSTRAINT habits_completion_type_check CHECK ((completion_type = ANY (ARRAY['interval'::text, 'toggle'::text])))
);


ALTER TABLE public.habits OWNER TO postgres;

--
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(24) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: habithistories completion_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habithistories ALTER COLUMN completion_id SET DEFAULT nextval('public.habithistories_completion_id_seq'::regclass);


--
-- Name: habithistories habithistories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habithistories
    ADD CONSTRAINT habithistories_pkey PRIMARY KEY (completion_id);


--
-- Name: habits habits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habits
    ADD CONSTRAINT habits_pkey PRIMARY KEY (habit_id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: habithistories unique_combination; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habithistories
    ADD CONSTRAINT unique_combination UNIQUE (habit_id, habit_entry_date, entry_index);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_user_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_name_key UNIQUE (username);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: habithistories fk_habit; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habithistories
    ADD CONSTRAINT fk_habit FOREIGN KEY (habit_id) REFERENCES public.habits(habit_id) ON DELETE CASCADE;


--
-- Name: habits fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habits
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

