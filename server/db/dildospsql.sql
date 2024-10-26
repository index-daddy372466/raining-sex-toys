--
-- officemods_userQL database dump
--

-- Dumped from database version 17rc1
-- Dumped by pg_dump version 17rc1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: scores; Type: TABLE; Schema: public; Owner: officemods_user
--

CREATE TABLE public.scores (
    score_id integer NOT NULL,
    best integer NOT NULL,
    average integer NOT NULL,
    u_id integer NOT NULL,
    score integer NOT NULL,
    level integer DEFAULT 0
);


ALTER TABLE public.scores OWNER TO officemods_user;

--
-- Name: scores_score_id_seq; Type: SEQUENCE; Schema: public; Owner: officemods_user
--

CREATE SEQUENCE public.scores_score_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.scores_score_id_seq OWNER TO officemods_user;

--
-- Name: scores_score_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: officemods_user
--

ALTER SEQUENCE public.scores_score_id_seq OWNED BY public.scores.score_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: officemods_user
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    display_name character varying(60) NOT NULL,
    email character varying(60) NOT NULL,
    password character varying(300) NOT NULL
);


ALTER TABLE public.users OWNER TO officemods_user;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: officemods_user
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO officemods_user;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: officemods_user
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: scores score_id; Type: DEFAULT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.scores ALTER COLUMN score_id SET DEFAULT nextval('public.scores_score_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: scores; Type: TABLE DATA; Schema: public; Owner: officemods_user
--

COPY public.scores (score_id, best, average, u_id, score, level) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: officemods_user
--

COPY public.users (user_id, display_name, email, password) FROM stdin;
\.


--
-- Name: scores_score_id_seq; Type: SEQUENCE SET; Schema: public; Owner: officemods_user
--

SELECT pg_catalog.setval('public.scores_score_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: officemods_user
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- Name: scores scores_pkey; Type: CONSTRAINT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT scores_pkey PRIMARY KEY (score_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: scores scores_u_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: officemods_user
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT scores_u_id_fkey FOREIGN KEY (u_id) REFERENCES public.users(user_id);


--
-- officemods_userQL database dump complete
--

