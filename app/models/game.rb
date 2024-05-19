class Game < ApplicationRecord
  default_scope {order(gametime: :asc)}
  validates :player_name, uniqueness: { scope: :mode, case_sensitive: true }



end
