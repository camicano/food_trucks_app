class RenameFoodType < ActiveRecord::Migration
  def change
  	remove_column :foods, :type
  	add_column :foods, :type_food, :string
  end
end
