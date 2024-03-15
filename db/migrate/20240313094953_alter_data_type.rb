class AlterDataType < ActiveRecord::Migration[7.1]
  def change
    remove_column :games, :gametime, :decimal
    add_column :games, :gametime, :float
    add_column :games, :player_name, :string
    add_column :games, :objective_sequence, :string
  end
end
