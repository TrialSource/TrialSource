class RemoveConditionyFromTrials < ActiveRecord::Migration
  def change
    remove_column :trials, :conditiony
  end
end
