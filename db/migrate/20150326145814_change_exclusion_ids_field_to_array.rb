class ChangeExclusionIdsFieldToArray < ActiveRecord::Migration
  def change
    remove_column :notifications, :exclusion_ids
    add_column :notifications, :exclusion_ids, :integer, array: true, default: []
  end
end
