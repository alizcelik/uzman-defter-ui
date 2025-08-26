drop table if exists projects;

drop type if exists status_type;
create type status_type as enum ('in-progress', 'completed');

create table
  projects(
    id bigint primary key generated always as identity not null,
    created_at timestamptz default now() not null,
    name text not null,
    slug text unique not null,
    description text,
    status status_type default 'in-progress' not null,
    collaborators text array default array[]::varchar[] not null
  );