class AddLatandLongToTrial < ActiveRecord::Migration
  def change
    add_column :trials, :longitude, :float
    add_column :trials, :latitude, :float
  end
end
