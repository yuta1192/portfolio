class ChangeColumnToCareer < ActiveRecord::Migration[6.1]
  def change
    remove_column :careers, :career_year_month
    add_column :careers, :year, :integer
    add_column :careers, :month, :integer
  end
end
