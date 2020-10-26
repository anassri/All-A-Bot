"""create rules table

Revision ID: 6e1e12630347
Revises: bc566d319d4b
Create Date: 2020-10-26 09:17:46.161144

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6e1e12630347'
down_revision = 'bc566d319d4b'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('rules',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('bot_id', sa.Integer(), sa.ForeignKey('bots.id'),
                              nullable=False),
                    sa.Column('prefix', sa.String(100)),
                    sa.Column('content', sa.Text()),
                    sa.PrimaryKeyConstraint('id'),
                    )


def downgrade():
    op.drop_table('rules')
