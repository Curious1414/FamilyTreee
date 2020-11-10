package com.ouri.tree.dao;

import java.util.List;

import com.ouri.tree.Person;

public interface FamilyRepoCustom {
	List<Person> getSelected(List<Integer> ids);
	Person getSingle(Integer id);
}
