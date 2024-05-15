class Game < ApplicationRecord
  default_scope {order(gametime: :asc)}
  
end
