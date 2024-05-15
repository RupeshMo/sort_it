class AddModeColum < ActiveRecord::Migration[7.1]
  def change
    add_column :games , :mode, :string
  end
end
