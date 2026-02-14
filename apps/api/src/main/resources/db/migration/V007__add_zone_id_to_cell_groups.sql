ALTER TABLE cell_groups ADD COLUMN zone_id UUID REFERENCES zones(id);

CREATE INDEX cell_groups_zone_id_idx ON cell_groups(zone_id);
