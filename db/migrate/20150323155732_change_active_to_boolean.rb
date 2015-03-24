class ChangeActiveToBoolean < ActiveRecord::Migration
  def change
    remove_column :trials, :active
    add_column :trials, :active, :boolean
  end
end
