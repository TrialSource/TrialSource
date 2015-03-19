class AddArchivedToTrials < ActiveRecord::Migration
  def change
    add_column :trials, :archived, :boolean
  end
end
