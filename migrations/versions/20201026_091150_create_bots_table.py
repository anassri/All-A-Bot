"""create bots table

Revision ID: bc566d319d4b
Revises: 2eb13cb77fe3
Create Date: 2020-10-26 09:11:50.615188

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bc566d319d4b'
down_revision = '2eb13cb77fe3'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('bots',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(),
                              sa.ForeignKey("users.id"), nullable=False),
                    sa.Column('name', sa.String(100), nullable=False),
                    sa.Column('description', sa.Text()),
                    sa.Column('developer_token', sa.String(100)),
                    sa.PrimaryKeyConstraint('id'),
                    )


def downgrade():
    op.drop_table('bots')
