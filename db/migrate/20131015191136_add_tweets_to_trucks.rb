class AddTweetsToTrucks < ActiveRecord::Migration
  def change
  	add_column :trucks, :tweets, :string
  end
end
