class AddConditionToTrials < ActiveRecord::Migration
  def change
    add_column :trials, :conditiony, :string
  end
end
