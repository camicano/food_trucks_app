class EditTweets < ActiveRecord::Migration
  def change
  	add_column :trucks, :tweet1, :string
  	add_column :trucks, :tweet2, :string
  	add_column :trucks, :tweet3, :string

  end
end
