class CreateCareers < ActiveRecord::Migration[6.1]
  def change
    create_table :careers do |t|
      t.date :career_year_month
      t.string :description

      t.timestamps
    end
  end
end
