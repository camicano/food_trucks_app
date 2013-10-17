class AddLocation < ActiveRecord::Migration
  def change
  	add_column :trucks, :location, :string
  end
end
