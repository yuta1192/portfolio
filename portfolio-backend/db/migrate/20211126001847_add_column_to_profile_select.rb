class AddColumnToProfileSelect < ActiveRecord::Migration[6.1]
  def change
    add_column :profiles, :work, :string, after: :address
    add_column :profiles, :selected, :boolean, default: false
    add_column :profiles, :instagram_url, :string, after: :youtube_url
  end
end
