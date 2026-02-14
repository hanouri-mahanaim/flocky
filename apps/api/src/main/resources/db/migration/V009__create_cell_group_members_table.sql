CREATE TABLE cell_group_members (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    cell_group_id UUID NOT NULL REFERENCES cell_groups(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('LEADER', 'MEMBER')),
    joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, cell_group_id)
);

CREATE INDEX cell_group_members_cell_group_id_idx ON cell_group_members(cell_group_id);
