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
-- Data for Name: habithistories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.habithistories (completion_id, habit_id, habit_entry_date, entry_index, completed, range_value) FROM stdin;
406	9cbd43e3-52b5-4375-9493-a9d93234fa16	2021-11-25 00:00:00+01	1	t	\N
407	9cbd43e3-52b5-4375-9493-a9d93234fa16	2021-11-24 00:00:00+01	1	t	\N
408	9cbd43e3-52b5-4375-9493-a9d93234fa16	2021-11-23 00:00:00+01	1	t	\N
410	0674b431-a6d1-4d02-b465-c07b41495e61	2021-11-25 00:00:00+01	0	\N	2
418	cc0bf9e7-dfe0-4416-82f2-ef454ba80f23	2021-11-25 00:00:00+01	0	\N	0
419	cc0bf9e7-dfe0-4416-82f2-ef454ba80f23	2021-11-26 00:00:00+01	0	\N	0
413	2c22d73b-a143-42c7-b8d8-494d3d023f60	2021-11-26 00:00:00+01	0	\N	0
385	9539544d-f508-4daa-a5dc-4cdb84af6648	2021-11-23 00:00:00+01	0	\N	30
403	9539544d-f508-4daa-a5dc-4cdb84af6648	2021-11-26 00:00:00+01	0	\N	0
515	66b4fe40-2d78-4b55-84ee-e4b07bbdf923	2021-12-01 00:00:00+01	0	t	\N
516	ff49be70-5fd9-40c0-8eae-741bcd7d2e8c	2021-12-01 00:00:00+01	0	t	\N
517	0674b431-a6d1-4d02-b465-c07b41495e61	2021-12-01 00:00:00+01	0	\N	1
425	18e40356-df5b-4458-9553-3c638c92f53c	2021-11-27 00:00:00+01	0	t	\N
411	0674b431-a6d1-4d02-b465-c07b41495e61	2021-11-26 00:00:00+01	0	\N	3
430	9cbd43e3-52b5-4375-9493-a9d93234fa16	2021-11-26 00:00:00+01	1	t	\N
432	9cbd43e3-52b5-4375-9493-a9d93234fa16	2021-11-26 00:00:00+01	0	t	\N
518	84fb0ebf-f4ce-4adb-8049-249eb68efcbe	2021-12-01 00:00:00+01	0	t	\N
519	1c17ddf0-4b3f-41f3-862e-a8b4bf79d3c6	2021-12-01 00:00:00+01	0	t	\N
520	9cbd43e3-52b5-4375-9493-a9d93234fa16	2021-12-01 00:00:00+01	0	t	\N
521	9cbd43e3-52b5-4375-9493-a9d93234fa16	2021-11-30 00:00:00+01	1	t	\N
522	9cbd43e3-52b5-4375-9493-a9d93234fa16	2021-12-01 00:00:00+01	1	t	\N
523	6b0079e7-c928-4c96-accb-093b264ce4a8	2021-11-29 00:00:00+01	0	f	\N
437	eb62b276-dae0-48ce-9a46-9e536d1e4fab	2021-11-26 00:00:00+01	0	\N	0
383	9539544d-f508-4daa-a5dc-4cdb84af6648	2021-11-24 00:00:00+01	0	\N	0
381	9539544d-f508-4daa-a5dc-4cdb84af6648	2021-11-25 00:00:00+01	0	\N	30
514	18e40356-df5b-4458-9553-3c638c92f53c	2021-12-01 00:00:00+01	0	t	\N
436	9539544d-f508-4daa-a5dc-4cdb84af6648	2021-11-27 00:00:00+01	0	\N	45
528	18e40356-df5b-4458-9553-3c638c92f53c	2021-12-02 00:00:00+01	0	t	\N
428	0674b431-a6d1-4d02-b465-c07b41495e61	2021-11-27 00:00:00+01	0	\N	3
409	9cbd43e3-52b5-4375-9493-a9d93234fa16	2021-11-25 00:00:00+01	0	f	\N
431	9cbd43e3-52b5-4375-9493-a9d93234fa16	2021-11-24 00:00:00+01	0	f	\N
405	18e40356-df5b-4458-9553-3c638c92f53c	2021-11-26 00:00:00+01	0	t	\N
458	732490f9-4ceb-4ac1-ab71-be7029f910ad	2021-11-27 00:00:00+01	0	f	\N
464	9cbd43e3-52b5-4375-9493-a9d93234fa16	2021-11-27 00:00:00+01	1	t	\N
465	18e40356-df5b-4458-9553-3c638c92f53c	2021-11-28 00:00:00+01	0	t	\N
466	0674b431-a6d1-4d02-b465-c07b41495e61	2021-11-28 00:00:00+01	0	\N	1
467	84fb0ebf-f4ce-4adb-8049-249eb68efcbe	2021-11-28 00:00:00+01	0	t	\N
468	cc0bf9e7-dfe0-4416-82f2-ef454ba80f23	2021-11-28 00:00:00+01	0	\N	0
472	84fb0ebf-f4ce-4adb-8049-249eb68efcbe	2021-11-29 00:00:00+01	0	t	\N
475	9cbd43e3-52b5-4375-9493-a9d93234fa16	2021-11-28 00:00:00+01	1	t	\N
477	9cbd43e3-52b5-4375-9493-a9d93234fa16	2021-11-28 00:00:00+01	0	t	\N
470	9539544d-f508-4daa-a5dc-4cdb84af6648	2021-11-29 00:00:00+01	0	\N	45
469	18e40356-df5b-4458-9553-3c638c92f53c	2021-11-29 00:00:00+01	0	t	\N
473	0674b431-a6d1-4d02-b465-c07b41495e61	2021-11-29 00:00:00+01	0	\N	0
488	18e40356-df5b-4458-9553-3c638c92f53c	2021-11-30 00:00:00+01	0	t	\N
495	84fb0ebf-f4ce-4adb-8049-249eb68efcbe	2021-11-30 00:00:00+01	0	t	\N
496	9539544d-f508-4daa-a5dc-4cdb84af6648	2021-11-28 00:00:00+01	0	\N	0
480	9539544d-f508-4daa-a5dc-4cdb84af6648	2021-11-30 00:00:00+01	0	\N	30
502	6b0079e7-c928-4c96-accb-093b264ce4a8	2021-11-30 00:00:00+01	0	t	\N
503	9cbd43e3-52b5-4375-9493-a9d93234fa16	2021-11-29 00:00:00+01	1	t	\N
474	9cbd43e3-52b5-4375-9493-a9d93234fa16	2021-11-29 00:00:00+01	0	t	\N
505	ff49be70-5fd9-40c0-8eae-741bcd7d2e8c	2021-11-30 00:00:00+01	0	t	\N
438	eb62b276-dae0-48ce-9a46-9e536d1e4fab	2021-11-27 00:00:00+01	0	\N	0
489	0674b431-a6d1-4d02-b465-c07b41495e61	2021-11-30 00:00:00+01	0	\N	3
\.


--
-- Data for Name: habits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.habits (habit_id, user_id, habit_name, description, completion_type, completion_timescale, completion_frequency, completion_interval, start_date, end_date, created, unit) FROM stdin;
18e40356-df5b-4458-9553-3c638c92f53c	436d2f05-edf9-4bb5-85a1-7a92061c17d1	Take a shower	shower daily	toggle	day	1	\N	2021-11-26 00:00:00+01	\N	2021-11-26	\N
66b4fe40-2d78-4b55-84ee-e4b07bbdf923	436d2f05-edf9-4bb5-85a1-7a92061c17d1	Shop for groceries	Every other day	toggle	week	3	\N	2021-11-22 01:00:00+01	\N	2021-11-26	\N
9539544d-f508-4daa-a5dc-4cdb84af6648	436d2f05-edf9-4bb5-85a1-7a92061c17d1	Take a walk	daily walk	interval	day	1	30	2021-11-22 01:00:00+01	\N	2021-11-25	minutes
ff49be70-5fd9-40c0-8eae-741bcd7d2e8c	436d2f05-edf9-4bb5-85a1-7a92061c17d1	Do the dishes	\N	toggle	week	3	1	2021-11-30 00:00:00+01	\N	2021-11-30	
0674b431-a6d1-4d02-b465-c07b41495e61	436d2f05-edf9-4bb5-85a1-7a92061c17d1	Do programming	few hours a day	interval	day	1	6	2021-11-24 01:00:00+01	\N	2021-11-26	\N
84fb0ebf-f4ce-4adb-8049-249eb68efcbe	436d2f05-edf9-4bb5-85a1-7a92061c17d1	Have breakfast		toggle	day	1	1	2021-11-28 00:00:00+01	\N	2021-11-28	
732490f9-4ceb-4ac1-ab71-be7029f910ad	436d2f05-edf9-4bb5-85a1-7a92061c17d1	Do date night	every Saturday	toggle	week	1	1	2021-11-27 00:00:00+01	\N	2021-11-27	
eb62b276-dae0-48ce-9a46-9e536d1e4fab	436d2f05-edf9-4bb5-85a1-7a92061c17d1	Go for a run	daily run	interval	day	1	3	2021-11-26 00:00:00+01	\N	2021-11-26	miles
6b0079e7-c928-4c96-accb-093b264ce4a8	436d2f05-edf9-4bb5-85a1-7a92061c17d1	Cook dinner	Don't order food every day	toggle	week	4	\N	2021-11-24 01:00:00+01	\N	2021-11-26	\N
1c17ddf0-4b3f-41f3-862e-a8b4bf79d3c6	436d2f05-edf9-4bb5-85a1-7a92061c17d1	Eat fruit	two pieces a day	toggle	day	2	\N	2021-11-22 01:00:00+01	\N	2021-11-26	\N
2c22d73b-a143-42c7-b8d8-494d3d023f60	436d2f05-edf9-4bb5-85a1-7a92061c17d1	Apply for jobs	send out at least one application a week	interval	week	1	1	2021-11-26 00:00:00+01	\N	2021-11-26	\N
cc0bf9e7-dfe0-4416-82f2-ef454ba80f23	436d2f05-edf9-4bb5-85a1-7a92061c17d1	Work out	Start doing a fitness routine	interval	day	1	15	2021-11-24 01:00:00+01	\N	2021-11-26	\N
9cbd43e3-52b5-4375-9493-a9d93234fa16	436d2f05-edf9-4bb5-85a1-7a92061c17d1	Brush teeth	twice a day	toggle	day	2	\N	2021-11-22 01:00:00+01	\N	2021-11-26	\N
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session (sid, sess, expire) FROM stdin;
dyZWAbS6bPYImQzjZPbnl7Vx7Pfr_nRH	{"cookie":{"originalMaxAge":604799961,"expires":"2021-12-09T15:05:02.819Z","secure":false,"httpOnly":true,"path":"/"},"passport":{"user":"test"}}	2021-12-09 16:05:03
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password) FROM stdin;
436d2f05-edf9-4bb5-85a1-7a92061c17d1	test	$2b$10$BaStPpP526TBJo9s4SMKnuR.lhqIh0T7KSFHRCvXZ3yI.kojV2qQa
\.


--
-- Name: habithistories_completion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.habithistories_completion_id_seq', 532, true);


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

