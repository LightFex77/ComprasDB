-- Table: public.abonos

-- DROP TABLE IF EXISTS public.abonos;

CREATE TABLE IF NOT EXISTS public.abonos
(
    id integer NOT NULL DEFAULT nextval('abonos_id_seq'::regclass),
    fecha_creacion timestamp with time zone NOT NULL,
    empleado_id integer NOT NULL,
    compra_id integer NOT NULL,
    estado character varying(3) COLLATE pg_catalog."default" NOT NULL,
    valor numeric(50,0) NOT NULL,
    dias numeric NOT NULL,
    CONSTRAINT abonos_pkey PRIMARY KEY (id),
    CONSTRAINT abono_compras FOREIGN KEY (compra_id)
        REFERENCES public.compras (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT abonos_empleado FOREIGN KEY (empleado_id)
        REFERENCES public.empleados (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.abonos
    OWNER to postgres;
-- Index: fki_abonos_empleado

-- DROP INDEX IF EXISTS public.fki_abonos_empleado;

CREATE INDEX IF NOT EXISTS fki_abonos_empleado
    ON public.abonos USING btree
    (empleado_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_c

-- DROP INDEX IF EXISTS public.fki_c;

CREATE INDEX IF NOT EXISTS fki_c
    ON public.abonos USING btree
    (compra_id ASC NULLS LAST)
    TABLESPACE pg_default;


-- Table: public.clientes

-- DROP TABLE IF EXISTS public.clientes;

CREATE TABLE IF NOT EXISTS public.clientes
(
    id integer NOT NULL DEFAULT nextval('clientes_id_seq'::regclass),
    ruc numeric NOT NULL,
    ruc_tipo character varying(50) COLLATE pg_catalog."default" NOT NULL,
    nombre character varying(50) COLLATE pg_catalog."default" NOT NULL,
    apellido character varying(50) COLLATE pg_catalog."default" NOT NULL,
    estado character varying(3) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT clientes_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.clientes
    OWNER to postgres;

    
-- Table: public.compras

-- DROP TABLE IF EXISTS public.compras;

CREATE TABLE IF NOT EXISTS public.compras
(
    id integer NOT NULL DEFAULT nextval('compras_id_seq'::regclass),
    valor numeric NOT NULL,
    fecha_creacion timestamp with time zone NOT NULL,
    fecha_vencimiento date NOT NULL,
    estado character varying(3) COLLATE pg_catalog."default" NOT NULL,
    tipo integer NOT NULL,
    cliente_id integer,
    empleado_id integer NOT NULL,
    CONSTRAINT compras_pkey PRIMARY KEY (id),
    CONSTRAINT compras_cliente FOREIGN KEY (cliente_id)
        REFERENCES public.clientes (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT compras_tipo_producto FOREIGN KEY (tipo)
        REFERENCES public.tipo_producto (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.compras
    OWNER to postgres;


-- Table: public.empleados

-- DROP TABLE IF EXISTS public.empleados;

CREATE TABLE IF NOT EXISTS public.empleados
(
    id integer NOT NULL DEFAULT nextval('empleados_id_seq'::regclass),
    nombre character varying(50) COLLATE pg_catalog."default" NOT NULL,
    apellido character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    rol character varying(20) COLLATE pg_catalog."default" NOT NULL,
    estado character varying(3) COLLATE pg_catalog."default" NOT NULL,
    fecha_creacion timestamp with time zone NOT NULL,
    CONSTRAINT empleados_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.empleados
    OWNER to postgres;


-- Table: public.tipo_producto

-- DROP TABLE IF EXISTS public.tipo_producto;

CREATE TABLE IF NOT EXISTS public.tipo_producto
(
    id integer NOT NULL DEFAULT nextval('tipo_producto_id_seq'::regclass),
    texto character varying(50) COLLATE pg_catalog."default" NOT NULL,
    estado character varying(3) COLLATE pg_catalog."default" NOT NULL,
    fecha_creacion timestamp with time zone NOT NULL,
    CONSTRAINT tipo_producto_pkey PRIMARY KEY (id),
    CONSTRAINT tipo_producto_texto_key UNIQUE (texto)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tipo_producto
    OWNER to postgres;
