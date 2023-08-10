-- TODO: Agregar los scripts para crear las tablas
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

