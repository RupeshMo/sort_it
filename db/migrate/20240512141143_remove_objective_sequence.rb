class RemoveObjectiveSequence < ActiveRecord::Migration[7.1]
  def change
    remove_column :games, :objective_sequence, :string
  end
end
