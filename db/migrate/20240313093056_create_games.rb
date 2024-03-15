class CreateGames < ActiveRecord::Migration[7.1]
  def change
    create_table :games do |t|
      t.decimal :gametime

      t.timestamps
    end
  end
end
