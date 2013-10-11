class AddFoodsTrucksTable < ActiveRecord::Migration
  def change
  	  create_table :foods_trucks, :id => false do |t|
        t.integer :truck_id
        t.integer :food_id

      t.timestamps
  end
  end
end
