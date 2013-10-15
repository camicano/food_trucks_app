class RemoveCreatesAndUpdatedFromJoinerTb < ActiveRecord::Migration
  def change
  	remove_column :foods_trucks, :created_at
  	remove_column :foods_trucks, :updated_at
  end
end
