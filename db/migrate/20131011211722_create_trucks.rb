class CreateTrucks < ActiveRecord::Migration
  def change
    create_table :trucks do |t|
      t.string :name
      t.string :tweet1
      t.string :tweet2
      t.string :tweet3
      t.integer :user_id
      t.string :photo_url

      t.timestamps
    end
  end
end
