class CreateSkills < ActiveRecord::Migration[6.1]
  def change
    create_table :skills do |t|
      t.string :name
      t.integer :type
      t.string :image

      t.timestamps
    end
  end
end
